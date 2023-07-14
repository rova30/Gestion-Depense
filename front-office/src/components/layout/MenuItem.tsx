import {IonItem, IonLabel, IonMenuToggle} from "@ionic/react";
import React from "react";
import './MenuItem.css';

export interface Menu {

    title: string,
    path: string
}

interface MenuItemProps {
    menu: Menu
}

export const MenuItem: React.FC<MenuItemProps> = ({menu}) => {
    return (
        <IonMenuToggle id="menu-toggle">
            <IonItem routerLink={menu.path} lines="none" id="menu-item">
                <IonLabel style={{'fontFamily':'QuickSand'}}>
                    {menu.title}
                </IonLabel>
            </IonItem>
        </IonMenuToggle>
    );
}


