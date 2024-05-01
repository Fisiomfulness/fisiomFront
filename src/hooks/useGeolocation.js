import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/User";

const useGeolocation = ({ defaultLocation }) => {
    const { user } = useContext(UserContext);
    const [coordinates, setCoordinates] = useState([0,0]);
    const onSuccess = (position) => {
        setCoordinates([
            position.coords.latitude,
            position.coords.longitude
        ]);
    };
    const onError = (error) => {
        if (user?.coordinates) {
            setCoordinates(user.coordinates);
        } else {
            setCoordinates(defaultLocation);
        }
    }

    useEffect(() => {   
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            onError()
        }
    }, [user]);
    
    return coordinates;
};
export default useGeolocation