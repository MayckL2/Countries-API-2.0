import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { getAll } from "../services/data";
import ContryCard from "../components/contryCard";
import { Skeleton } from "@mui/material";
import { FaArrowCircleUp } from "react-icons/fa";
import { WiSnow } from "react-icons/wi";

type contryType = {
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: string
}

export default function Home(this: any) {
    const [select, setSelect] = useState('')
    const [contries, setContries] = useState<contryType[] | any[] | undefined>()
    const [all, setAll] = useState<contryType[] | any[] | undefined>()
    const items: MenuProps['items'] = [
        {
            label: <a className="hover:pl-2" onClick={() => handleRegion('Africa')}>Africa</a>,
            key: '0',
        },
        {
            label: <a className="hover:pl-2" onClick={() => handleRegion('Americas')}>America</a>,
            key: '1',
        },
        {
            label: <a className="hover:pl-2" onClick={() => handleRegion('Asia')}>Asia</a>,
            key: '2',
        },
        {
            label: <a className="hover:pl-2" onClick={() => handleRegion('Europe')}>Europa</a>,
            key: '3',
        },
        {
            label: <a className="hover:pl-2" onClick={() => handleRegion('Oceania')}>Oceania</a>,
            key: '4',
        },

    ];

    // muda continente
    function handleRegion(region: string) {
        setSelect(region)
        let search: any[] | undefined = []
        search = all?.filter((value: any) => {
            return value.region == region
        })
        setContries(search)
    }

    // busca pelo nome do pais
    function handleSearch(e: string) {
        console.log(e)
        if (e) {
            let search: any[] | undefined = []
            search = contries?.filter((value: any) => {
                let lower = value.name.toLowerCase()
                return lower.includes(e.toLowerCase())
            }
            )
            console.log(search)
            setContries(search)
        } else {
            setContries(all)
        }
    }

    // Retorna todos os paises
    function handleAPI() {
        let response = getAll()
        setAll(response)
        setContries(response)
        console.log(response)
    }

    // Rola a pagina de volta para o topo
    function rollBack(){
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        handleAPI()
    }, [])

    return (<main className="relative px-4 sm:px-8 py-8 grid gap-8">
        <FaArrowCircleUp onClick={rollBack} className="fixed bottom-4 right-4 text-4xl cursor-pointer hover:mb-2 transition-all"/>
        <section className="w-full flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex items-center gap-4 text-lg p-4 w-full sm:w-1/3 shadow-lg rounded-lg bg-slate-300 dark:bg-slate-700">
                <FaSearch className="text-xl absolute top-5 left-4" />
                <input onChange={(e) => handleSearch(e.target.value)} className="bg-transparent focus:outline-none pl-8 placeholder:text-sm md:placeholder:text-base" type="text" placeholder="Search for a country..." />
            </div>

            <Dropdown menu={{ items, theme: 'dark' }} trigger={['click']}>
                <button className="bg-slate-300 dark:bg-slate-700 p-4 rounded-lg shadow-lg" onClick={(e) => e.preventDefault()}>
                    <Space>
                        {select ? select : 'Filter by Region...'}
                        <DownOutlined />
                    </Space>
                </button>
            </Dropdown>
        </section>

        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {contries && contries.map((value: contryType, key) => {
                return <ContryCard key={key} flag={value.flag} name={value.name} population={value.population} region={value.region} capital={value.capital} />
            })}

            {contries == undefined &&
                <>
                    <div className="grid">
                        <Skeleton variant="rounded" animation="wave" width={'100%'} height={158} />
                        <div>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" width={'100%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                        </div>
                    </div>
                    <div className="grid">
                        <Skeleton variant="rounded" animation="wave" width={'100%'} height={158} />
                        <div>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" width={'100%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                        </div>
                    </div>
                    <div className="grid">
                        <Skeleton variant="rounded" animation="wave" width={'100%'} height={158} />
                        <div>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" width={'100%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                        </div>
                    </div>
                    <div className="grid">
                        <Skeleton variant="rounded" animation="wave" width={'100%'} height={158} />
                        <div>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" width={'100%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                            <Skeleton variant="text" animation="wave" width={'50%'} />
                        </div>
                    </div>
                </>
            }
        </section>
    </main>)
}