import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const useGeolocation = ({ defaultLocation }) => {
    const { data: session } = useSession()
    const [coordinates, setCoordinates] = useState([0,0]);
    const onSuccess = (position) => {
        setCoordinates([
            position.coords.latitude,
            position.coords.longitude
        ]);
    };
    const onError = (error) => {
        if (session?.user?.coordinates[0] && session?.user?.coordinates[0] !== 0) {
            setCoordinates(session.user.coordinates);
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
    }, [session]);
    
    return coordinates;
};
export default useGeolocation