import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegation";
import NavegationPrincipal from "./NavegationPrincipal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef, use } from "react";
import { AppState } from "react-native";

export default function AppNavegacion(){
    const [isloading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);

    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
        }catch (error) {
            console.error("Error al cargar el token desde AsyncStorage: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    //se ejecuta cuando el componente se monta
    useEffect(() =>{
        loadToken();
    },[])

    //Se ejecuta cuando hay cambio de estado en la appp (iniciativa(activa/Backround)
    useEffect(() =>{
        const handleAppStateChange = (nextAppState)=>{
            if(appState.current.match(/inactive|background/) && nextAppState === "active"){
                console.log("La aplicacion ha vuelto al primer plano, verificando el token...");
                loadToken();
            }
            appState.current = nextAppState;
        };
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => subscription.remove();
    },[]);

    //Se ejecuta en un intervalo de 2 segundos
   useEffect(() => {
    const interval = setInterval(() =>{
        if (AppState.currentState === "active"){
            loadToken();
        }
    }, 2000);
    return ()=> clearInterval(interval);
    },[]);

        return(
            <NavigationContainer>
                {userToken ? <NavegationPrincipal/> : <AuthNavegacion/>}
            </NavigationContainer>
        );
}