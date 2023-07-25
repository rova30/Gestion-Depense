import React, {useEffect, useState} from 'react';
import './Banner.css';
import {
    IonActionSheet,
    IonButton,
    IonButtons,
    IonImg,
    IonLabel,
IonSpinner
} from "@ionic/react";
import { getMembreByToken, getProfilDuMois, Profil } from '../../data/membre.service';
import { BsCameraFill } from 'react-icons/bs';
import { formatNumber } from '../../utils/Util';
import ReactCrop from 'react-easy-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import { baseUrl } from '../../data/global_config';


const Banner: React.FC = () => {

    const [famille, setFamille] = useState(0);
    const [profil, setPofil] = useState<Profil>(Object);
    const [membre, setMembre] = useState(0);
    const [familleChargee, setFamilleChargee] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [originalImageSrc, setOriginalImageSrc] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);


    const handleModifierClick = () => {
        // Afficher l'IonActionSheet
        setShowActionSheet(true);
        setOriginalImageSrc(imageSrc);
        setIsCropping(true);
    };

    const handleActionSheetClick = (choice: string) => {
        // Masquer l'IonActionSheet
        setShowActionSheet(false);
    
        if (choice === 'gallery') {
            // Ouvrir la galerie de photos
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
    
            // Ajouter un écouteur pour gérer la sélection de fichier
            fileInput.addEventListener('change', (event) => {
                const selectedFile = (event.target as HTMLInputElement).files?.[0];
                if (selectedFile) {
                    // Récupérer l'image en base64 pour l'affichage et le rognage
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImageSrc(reader.result as string);
                    };
                    reader.readAsDataURL(selectedFile);
                }
            });
    
            // Déclencher le clic sur l'élément input pour ouvrir la fenêtre de sélection de fichier
            fileInput.click();
        } else if(choice === 'annuler'){
            setIsCropping(false);
        }
    };
    
    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    

    
    const getCroppedImg = async (imageSrc: string, croppedAreaPixels: any): Promise<string | null> => {
        if (!croppedAreaPixels) {
            return Promise.reject('Impossible de rogner l\'image car l\'emplacement de rognage est nul.');
        }
    
        const image = new Image();
        image.src = imageSrc;
    
        return new Promise<string>((resolve, reject) => {
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;
                const ctx = canvas.getContext('2d');
    
                if (ctx) {
                    ctx.drawImage(
                        image,
                        croppedAreaPixels.x * scaleX,
                        croppedAreaPixels.y * scaleY,
                        croppedAreaPixels.width * scaleX,
                        croppedAreaPixels.height * scaleY,
                        0,
                        0,
                        croppedAreaPixels.width,
                        croppedAreaPixels.height
                    );
    
                    // Convertir la capture en base64
                    const base64Data = canvas.toDataURL('image/jpeg');
                    resolve(base64Data);
                } else {
                    reject('Impossible de rogner l\'image');
                }
            };
    
            image.onerror = () => {
                reject('Erreur lors du chargement de l\'image');
            };
        });
    };
    


    const updateProfilPic = async (membreId: number, image: string | null) => {
        setIsUpdating(true);
        try {
            const response = await axios.post(baseUrl(`modifier-photo`), {
                membre_id: membreId,
                image: image,
            });
            console.log(response.data.message); // Affiche le message de la réponse du backend
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la photo de profil', error);
        }
        setIsUpdating(false);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        getMembreByToken(token)
            .then(response => {
                setMembre(response.data.membre.id);
                setFamille(response.data.membre.famille_id);
                setFamilleChargee(true);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du membre', error);
            });
    }, []);

    useEffect(() => {
        if (familleChargee) {
            getProfilDuMois(membre,famille)
                .then(response => {
                    console.log(response.data);
                    setPofil(response.data.profil);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du profil du mois', error);
                });
        }
    }, [famille, familleChargee]);
    if (!familleChargee) {
        return (
            <div className="spinner-container" style={{'textAlign':'center'}}>
                <IonSpinner name="dots" />
            </div>
        );
    }
    
    const handleCancelCropping = () => {
        setIsCropping(false);
        setCroppedImageUrl(null);
        setImageSrc('');
    };
    
    const handleSaveCroppedImage = async () => {
        if (imageSrc && croppedAreaPixels) {
            try {
                const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
                setCroppedImageUrl(croppedImage);
                
                // Envoi de l'image rognée en base64 au backend
                await updateProfilPic(membre, croppedImage);
                setIsCropping(true);
            } catch (e) {
                console.error('Erreur lors du rognage de l\'image', e);
            }
        }
        setIsCropping(false);
        setCroppedImageUrl(null);
    };


    return (
        <div id="container-profil">
            <div id="profil-pic">
                <IonImg src={profil.photo} id="pic" alt='profil pic'/>
                {!isCropping && (
                    <IonButton id="btn-modifier" onClick={handleModifierClick}>
                        <IonLabel><BsCameraFill id="camera-icon"/></IonLabel>
                    </IonButton>
                )}
            </div>
            {isUpdating && (
            <div className="spinner-container" style={{ textAlign: 'center' }}>
                <IonSpinner name="dots" />
            </div>
            )}
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                header="Modifier la photo de profil"
                buttons={[
                    {
                        text: 'Choisir dans la galerie',
                        handler: () => handleActionSheetClick('gallery')
                    },
                    {
                        text: 'Annuler',
                        handler: () => handleActionSheetClick('annuler'),
                        role: 'cancel'
                    }
                ]}
            />
    
            <div id="profil-name">
                <h2>{profil.prenom}&nbsp;{profil.nom}</h2>
                <h4>{profil.role}</h4>
            </div>
            <div id="profil-stat">
                <div id="revenu-profil">
                    <h3>{formatNumber(profil.total_revenu)}</h3>
                    <h5>Revenu</h5>
                </div>
                <div id="depense-profil">
                    <h3>{formatNumber(profil.total_depense)}</h3>
                    <h5>Dépense</h5>
                </div>
            </div>
    
            {/* Afficher ReactCrop et les boutons "Valider" et "Annuler" uniquement lorsque `isCropping` est vrai */}
            {isCropping && imageSrc && (
                <div id="crop">
                    <ReactCrop
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                    <div className="button-container">
                        <IonButtons>
                            <IonButton id="btn-annuler" onClick={handleCancelCropping}>Annuler</IonButton>
                            <IonButton id="btn-valider" onClick={handleSaveCroppedImage}>Valider</IonButton>
                        </IonButtons>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Banner;    