import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getAll } from "../services/data";
import { Skeleton } from "@mui/material";

type contryType = {
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: string
}

export default function Country() {
    let { name } = useParams();
    const [country, setCountry] = useState<contryType | any>()
    const [population, setPopulation] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        let response = getAll()
        let filter = response.filter((value) => value.name == name?.split('=')[1])
        setCountry(filter[0])
        setPopulation(decimal(filter[0].population))
    }, [])

    function decimal(value: number){
        let param = String(value).split('').reverse()
        let quant = 0
        let decimal = ''
        for (let i = 0; i < param.length; i++) {
            if(quant == 3){
                quant = 1
                decimal += '.'
            }else{
                quant += 1
            }
            decimal += param[i]
        }
        return decimal.split('').reverse().toString().replaceAll(',', '')
    }

    return (<main className="px-4 sm:px-8 py-8">

        <Link to={'/'} className="flex items-center gap-4 w-min text-lg py-2 px-6 mb-8 shadow-lg rounded-lg bg-slate-300 dark:bg-slate-700 hover:opacity-50 transition-all">
            <FaArrowLeft />
            Back
        </Link>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {country && <>
                <img src={country.flag} alt={country.name} />
                <div className="flex justify-between sm:justify-start flex-wrap gap-4 md:gap-8">
                    <h1 className="w-full h-min font-bold text-5xl">{country.name}</h1>
                    <div>
                        <p><span className="font-bold">Native Name:</span> {country.nativeName}</p>
                        <p><span className="font-bold">Population:</span> {population}</p>
                        <p><span className="font-bold">Region:</span> {country.region}</p>
                        <p><span className="font-bold">Sub Region:</span> {country.subregion}</p>
                        <p><span className="font-bold">Capital:</span> {country.capital}</p>
                    </div>
                    <div>
                        <p><span className="font-bold">Top Level Domain:</span> {country.topLevelDomain}</p>
                        <p><span className="font-bold">Currencies:</span> {country.currencies[0].name}</p>
                        <p><span className="font-bold">Languages:</span> {country.languages[0].name}</p>
                    </div>
                    {country.borders &&
                        <div className="flex gap-2 col-span-2 items-center">
                            <p className="font-bold text-lg whitespace-nowrap">Borders Countries:</p>
                            <ul className="flex flex-wrap gap-2">
                                {country.borders.map((value: string, key: number) => <li key={key} className="py-2 px-4 rounded bg-slate-300 dark:bg-slate-700 h-min shadow-lg">{value}</li>)}
                            </ul>
                        </div>
                    }
                </div>
            </>}

            {!country && <>
                <Skeleton variant="rounded" animation="wave" width={'100%'} height={300} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" width={'50%'} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                    </div>
                    <div className="sm:mt-12">
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                    </div>
                    <Skeleton className="col-span-2" variant="text" sx={{ fontSize: '1rem' }} animation="wave" width={'70%'} />
                </div>
            </>}

        </section>
    </main>)
}