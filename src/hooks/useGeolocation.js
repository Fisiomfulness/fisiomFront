import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { atom, useAtom } from "jotai";

const locationAtom = atom({
  user: [0, 0]
});

const useGeolocation = () => {
    const { data: session } = useSession()
    const [location, setLocation] = useAtom(locationAtom);
    const onSuccess = (position) => {
        setLocation((prev) => ({ ...prev, user: [
            position.coords.latitude,
            position.coords.longitude
        ]}));
    };
    const onError = (error) => {
        if (session?.user?.coordinates) {
            setLocation((prev) => ({ ...prev, user: session.user.coordinates })); 
        }
    }

    useEffect(() => {   
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            onError()
        }
    }, [session]);
    
    return location;
};
export default useGeolocation