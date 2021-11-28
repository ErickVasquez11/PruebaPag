import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const EnterHandler = () => {
        navigate("/Login");
    }

    return(
        <div>
            <button onClick= {EnterHandler}> entrar a UCA PAGES</button>
        </div>
    )
}