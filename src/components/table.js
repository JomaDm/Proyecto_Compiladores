const Table = ({automatas}) => {
    
    return (
        <div className="table-list">
            {   
                automatas.map( automata  => {                    

                    let strEdos = [];
                    console.log(automata.edosAFN);
                    for (let edo of automata.edosAFN) {
                        strEdos.push(edo.toStringEdo())                        
                    }

                    let strEdosAc = [];
                    console.log(automata.edosAceptacion);
                    for (let edo of automata.edosAceptacion) {
                        strEdosAc.push(edo.toStringEdo())                        
                    }
                    

                    return (
                        <div className="table-preview" key={automata.idAFN}>
                            <h2>ID {automata.idAFN}</h2>
                            <p>Alfabeto: [ {Array.from(automata.alfabeto).join(',')} ]</p>
                            <p>Estados: [ {strEdos.join(' , ')} ]</p>
                            <p>Edo inicial: [ {automata.edoInicial.toStringEdo()} ]</p>
                            <p>Edos aceptación: [ {strEdosAc.join(' , ')} ]</p>
                        </div>
                    );
                })
            }
        </div>
    );
}
 
export default Table;