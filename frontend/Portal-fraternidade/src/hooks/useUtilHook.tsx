import { useNavigate } from "react-router-dom";

export function handleNavigate() {
    const navigate = useNavigate()

    function goingAhead(path: string) {
        navigate('/'+path);
    }
    
    return {
        goingAhead
    }
}
