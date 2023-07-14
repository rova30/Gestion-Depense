import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getTotalRevenuParMois } from '../../data/revenu.service';
import { getTotalDepenseParMois } from '../../data/depense.service';
import { getMembreByToken } from '../../data/membre.service';
import {IonSpinner } from '@ionic/react';

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

const Dashboard: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
    const [famille, setFamille] = useState(0);
    const [familleChargee, setFamilleChargee] = useState(false);

    const year = new Date().getFullYear();


    interface GroupedData {
        [year: string]: {
          labels: string[];
          data: number[];
        };
      }

    const colors = [
    'rgba(75, 192, 192, 1)', // Couleur pour les revenus
    'rgba(255, 99, 132, 1)', // Couleur pour les dépenses
    'rgba(54, 162, 235, 1)',
    // Ajoutez plus de couleurs ici si nécessaire
    ];

    function getBorderColor(index: number, datasetIndex: number): string {
    return colors[datasetIndex % colors.length];
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
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
              if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
              }
              
            const groupedData = revenuData.reduce((acc: any, item: any) => {
            const year = item.annee;
            if (!acc[year]) {
                acc[year] = {
                labels: [],
                revenus: [],
                depenses: [],
                };
            }
            acc[year].labels.push(monthNames[item.mois - 1]);
            acc[year].revenus.push(item.total_revenu / 1000000);
            const depenseItem = depenseData.find((depense: any) => depense.annee === year && depense.mois === item.mois);
            acc[year].depenses.push(depenseItem ? depenseItem.total_depense / 1000000: 0);
            return acc;
            }, {}) as GroupedData;

            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: Object.values(groupedData)[0].labels,
                  datasets: [
                    ...Object.entries(groupedData).map(([year, group]: [string, any], index: number) => ({
                      label: `Revenu`,
                      data: group.revenus,
                      borderColor: getBorderColor(index, 0), // Utilise la première couleur pour les revenus
                      barPercentage: 0.5,
                      backgroundColor:getBorderColor(index, 0),
                      barThickness: 8,
                      maxBarThickness: 10,
                      minBarLength: 6,
                      fill: false,
                    })),
                    ...Object.entries(groupedData).map(([year, group]: [string, any], index: number) => ({
                      label: `Dépense`,
                      data: group.depenses,
                      borderColor: getBorderColor(index, 1), // Utilise la deuxième couleur pour les dépenses
                      barPercentage: 0.5,
                      barThickness: 8,
                      backgroundColor:getBorderColor(index, 1),
                      maxBarThickness: 10,
                      minBarLength: 6,
                      fill: false,
                    })),
                  ],
                },
                
                options: {
                  
                scales: {
                  x: {
                    grid: {
                      offset: true
                    },
                    ticks: {
                      autoSkip: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (tickValue: string | number) {
                        const value = Number(tickValue); // Convertit la valeur en number
                        return value + ' M'; // Ajoute "M" à côté de la valeur
                      },
                    },
                },
                },
            },
            }); 
           }
          }
        } catch (error) {
          // Gérer les erreurs de requête
          console.error(error);
        }
      };
  
      fetchData();
    }, [famille,familleChargee]);
    if (!familleChargee) {
        return (
            <div className="spinner-container" style={{'textAlign':'center'}}>
                <IonSpinner name="circular" />
            </div>
        );
    }
  
    return (
      <div id="card">
        <h5 style={{'textAlign':'center','color':'black','fontSize':'15px'}}>Statistiques {year}</h5>
      <div style={{'position': 'relative', 'height':'%', 'width':'100%'}}>
        <canvas ref={chartRef}></canvas>
      </div>
      </div>
    );
  };
  
  export default Dashboard;
    