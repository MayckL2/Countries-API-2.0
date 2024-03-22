import { Link } from "react-router-dom"

type contryProp = {
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: string
}

export default function ContryCard(props: contryProp){

    return(<Link to={`/country/${props.name}`} className="rounded-lg overflow-hidden bg-slate-300 dark:bg-slate-700 cursor-pointer">
        <img className="h-40 w-full object-cover" src={props.flag} alt={props.name} />
        <p className="text-xl font-bold m-4">{props.name}</p>

        <div className="mx-4 mb-6 grid gap-1 text-sm">
        <span><span className="font-bold">Population:</span> {props.population}</span>
        <span><span className="font-bold">Region:</span> {props.region}</span>
        <span><span className="font-bold">Capital:</span> {props.capital}</span>
        </div>
    </Link>)
}