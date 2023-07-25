import React, { useEffect, useRef, useState } from 'react';
import { getTotalRevenuParMois } from '../../data/revenu.service';
import { getTotalDepenseParMois } from '../../data/depense.service';
import { getMembreByToken } from '../../data/membre.service';
import { IonSpinner } from '@ionic/react';
import ApexCharts from 'apexcharts';
import './Dashboard.css'

const monthNames = [
  'J',
  'F',
  'M',
  'A',
  'M',
  'J',
  'J',
  'A',
  'S',
  'O',
  'N',
  'D',
];

const ApexChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [famille, setFamille] = useState(0);
  const [familleChargee, setFamilleChargee] = useState(false);

  const year = new Date().getFullYear();

  interface GroupedData {
    [year: string]: {
      labels: string[];
      revenus: number[];
      depenses: number[];
    };
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getMembreByToken(token)
      .then(response => {
        setFamille(response.data.membre.famille_id);
        setFamilleChargee(true);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du membre', error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familleId = famille; // Remplacez par la logique pour obtenir l'ID de la famille
        const [revenuResponse, depenseResponse] = await Promise.all([
          getTotalRevenuParMois(familleId),
          getTotalDepenseParMois(familleId),
        ]);

        const revenuData = revenuResponse.data.revenus;
        const depenseData = depenseResponse.data.depenses;

        if (chartRef.current) {
            const groupedData = revenuData.reduce((acc: GroupedData, item: any) => {
                const year = item.annee;
                if (!acc[year]) {
                  acc[year] = {
                    labels: [],
                    revenus: [],
                    depenses: [],
                  };
                }
                const depenseItem = depenseData.find((depense: any) => depense.annee === year && depense.mois === item.mois);
                acc[year].labels.push(monthNames[item.mois - 1]);
                acc[year].revenus.push(item.total_revenu / 1000000);
                acc[year].depenses.push(depenseItem ? depenseItem.total_depense / 1000000 : 0);
                return acc;
              }, {}) as GroupedData;
              const series = [
                {
                  name: 'Revenu',
                  data: Object.values(groupedData)[0].revenus,
                },
                {
                  name: 'Dépense',
                  data: Object.values(groupedData)[0].depenses,
                },
              ];
                const options = {
                    chart: {
                    type: 'area',
                    toolbar: {
                      tools: {
                        download: true, // Masquer le bouton de téléchargement si nécessaire
                        zoom: true, // Masquer le bouton de zoom si nécessaire
                        zoomin: {
                          color: '#9CB0D9', // Couleur du bouton de zoom avant
                        },
                        zoomout: {
                          color: '#9CB0D9', // Couleur du bouton de zoom arrière
                        },
                        reset: {
                          color: '#9CB0D9', // Couleur du bouton de réinitialisation
                        },
                      },
                    },
                    },
                    series: series,
                    xaxis: {
                    categories: Object.values(groupedData)[0].labels,
                    labels: {
                      style: {
                        fontFamily: 'Arial', // Spécifier la police souhaitée pour les labels de l'axe des x
                      },
                    },
                    },
                    dataLabels: {
                      enabled: false, // Désactiver l'affichage des étiquettes de données
                    },
                    yaxis: {
                      labels: {
                        formatter: (value: number) => `${value} M`, // Ajouter ' M' après le nombre pour représenter les millions
                        style: {
                          fontFamily: 'QuickSand', // Spécifier la police souhaitée
                        },
                      },
                    },
                    colors: ['#07F2B0', '#F20587'],
                    grid: {
                      borderColor: '#A691F2', // Spécifier la couleur des lignes de repère
                    }
                };

          new ApexCharts(chartRef.current, options).render();
        }
      } catch (error) {
        // Gérer les erreurs de requête
        console.error(error);
      }
    };

    fetchData();
  }, [famille, familleChargee]);

  if (!familleChargee) {
    return (
      <div className="spinner-container" style={{ textAlign: 'center' }}>
        <IonSpinner name="dots" />
      </div>
    );
  }

  return (
    <div id="card-dashboard" style={{'fontFamily': 'Quicksand'}}>
      <h5 style={{ textAlign: 'center', color: 'black', fontSize: '15px' }}>Activités {year}</h5>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

export default ApexChart;
