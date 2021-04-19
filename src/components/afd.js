import React from 'react';

const AfdTable = ({afd}) => {    
    return ( 
        <div>
            <table>
                <thead>                    
                    <tr>
                        <th></th>
                        {
                            afd.alfabeto.map( (simb,index) =>{
                                return (
                                    <th key={index}>
                                        {simb}
                                    </th>
                                );
                            })
                        }
                        <th>Token</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        afd.tablaTrans.map( (fila,index) =>{
                            return (                                
                                <tr key={index}>
                                    <td>{index}</td>
                                    {
                                    fila.map( (elemento,indice) => {
                                        return (
                                            <td key={indice}>
                                                {elemento}
                                            </td>
                                        );
                                    })
                                    }
                                </tr>
                            )}
                        )
                    }
                </tbody>
            </table>
        </div>
     );
}
 
export default AfdTable;