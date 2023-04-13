import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"

const buttons = []

for (let i = 0; i <= 14; i++) {
    buttons.push(i);
}

function Paginado() {

    const dispatch = useDispatch();
    const originalPokemons = useSelector(state => state.originalPokemons);
    let page = useSelector(state => state.page);

    const id = originalPokemons.filter(p=>p.db !== "db" ).length

  return (
    <div className='paginado_wrapper'>

        <button className={page === 1 ? "isSelect": undefined } onClick={()=>{ dispatch(actions.noFilter(originalPokemons));
                                                                              dispatch(actions.actualizarPaginado(1)) }}> 1</button>
        
        {
            buttons.map((i,index) => (
                <button key={index} className={page === (i)+2 ? "isSelect" : undefined } onClick={(e)=>{ dispatch(actions.cambiarPaginado(id+ ((i)*12)));
                                                                                                        dispatch(actions.actualizarPaginado(i+2)) }} >
                {i+2}</button>
            ))
        }
    </div>
  )
}

export default Paginado