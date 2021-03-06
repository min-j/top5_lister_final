import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import AuthContext from '../auth'
import WelcomeScreen from './WelcomeScreen';
import Navigation from './Navigation';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    // console.log("HomeWrapper auth.guest: " + auth.guest);

    if (auth.loggedIn || auth.guest)
        return (
            <div>
                <Navigation />
                <HomeScreen />
            </div>
        )
        // return <HomeScreen />
    else
        return <WelcomeScreen />
}