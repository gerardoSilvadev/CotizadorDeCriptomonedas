import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { monedas } from '../date/monedas'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'





const InputSubmit = styled.input`
    background-color:#9497ff;
    border:none;
    width:100%;
    padding:10px;
    color:#fff;
    font-weight:bold;
    text-transform:uppercase;
    font-size:20px;
    border-radius:5px;
    transition:background-color .3s ease;
    margin-top:30px;
    &:hover { 
        background-color:#7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    //Creamos el state
    const [crypto,setCrypto] = useState([]); 

    //creamos el componente error
    const [error, setError] = useState(false);
    
    //Extraemos la funcion y la mandamos a llamar desde hooks
    const [moneda,SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
    const [criptomoneda,SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', crypto);


    //Mandamos a llamar la api con useEfect
    useEffect(()=> { 
        const consultarAPI = async () => { 
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            

            const arrayCyptos = resultado.Data.map( cripto =>  {

                //creamos un objeto
                const objeto =  {
                    id:cripto.CoinInfo.Name,
                    nombre:cripto.CoinInfo.FullName
                }
                return objeto;
                })

                setCrypto(arrayCyptos)
            }
        consultarAPI();
    },[])

    const handleSubmit = (e) => { 
        e.preventDefault()

        if([moneda, criptomoneda].includes('')) { 
            setError(true)
            return;
        }
        
        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }
    
    return (
        <>
            {/* Alerta de error */}
            {error && <Error>Todos los campos son obligatorios</Error>}

            <form
            //validamos el formulario
            onSubmit={handleSubmit}
        >

            <SelectMonedas/>
            <SelectCriptomoneda/>
            
            <InputSubmit 
            type="submit" 
            value="Cotizar" 
            />
            </form>
        </>
  )
}

export default Formulario