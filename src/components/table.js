const Table = ({automatas, eliminarAutomata}) => {

    return (
        <div className="table-list">
            {   
                automatas.map( automata  => {                    

                    let strEdos = [];
                    //console.log(automata.edosAFN);
                    for (let edo of automata.edosAFN) {
                        strEdos.push(edo.toStringEdo())                        
                    }

                    let strEdosAc = [];
                    //console.log(automata.edosAceptacion);
                    for (let edo of automata.edosAceptacion) {
                        strEdosAc.push(edo.toStringEdo())                        
                    }

                    let strTran = [];
                    for(let edo of automata.edosAFN){                        
                        strTran.push(edo.printStringEdo());
                    }
                   

                    return (
                        <div className="table-preview" key={automata.idAFN}>
                            <h2>ID {automata.idAFN}</h2>
                            <p>Alfabeto: [ {Array.from(automata.alfabeto).join(' , ')} ]</p>
                            <p>Estados: [ {strEdos.join(' , ')} ]</p>
                            <p>Edo inicial: [ {automata.edoInicial.toStringEdo()} ]</p>
                            <p>Edos aceptación: [ {strEdosAc.join(' , ')} ]</p>
                            <p>Transiciones: </p>
                            
                            {
                                strTran.map( tran => {
                                    return <p>{tran}</p>
                                })
                            }
                            <br/>
                            <button className="button" onClick={() => eliminarAutomata(automata.idAFN)}>Eliminar Automata</button>
                            
                            
                        </div>  
                    );
                })
            }
        </div>
    );
}
 
export default Table;