import BanksPage from "../pages/BanksPage";
import CalculatorPage from "../pages/CalculatorPage";


export const routes = [
    {component: BanksPage, path: '/banks', exact: true},
    {component: CalculatorPage, path: '/calculator', exact: true}
]