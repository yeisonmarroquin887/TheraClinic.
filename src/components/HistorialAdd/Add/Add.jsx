import React, { useState } from 'react'
import './Add.css'
import AddEnfermedad from './AddEnfermedad'
import AddAlergia from './AddAlergia'
import Addchekeo from './Addchekeo'
import AddMalestares from './AddMalestares'
import AddMedicamento from './AddMedicamento'

const Add = ({pacienteId, onNewE, onNewA, onNewMa, onNewV}) => {
   const [Addnew, setAddnew] = useState()

  return (
	<div className='Add'>
		<div>
		<button onClick={() => setAddnew(0)}>Agregar patoligia</button>
		<button onClick={() => setAddnew(1)}>Agregar alergia</button>
		<button onClick={() => setAddnew(2)}>Agregar chekeo</button>
		<button onClick={() => setAddnew(3)}>Agregar malestar</button>
		</div>

		<div>
			{
				(Addnew === 0)?(
					<AddEnfermedad pacienteId={pacienteId} onNew={onNewE} setAddnew={setAddnew}/>
				):(Addnew === 1)?(
					<AddAlergia pacienteId={pacienteId} onNew={onNewA} setAddnew={setAddnew}/>
				):(Addnew === 2)?(
					<Addchekeo pacienteId={pacienteId} onNew={onNewV} setAddnew={setAddnew}/>
				):(Addnew === 3)?(
					<AddMalestares pacienteId={pacienteId} onNew={onNewMa} setAddnew={setAddnew}/>
				):(
					<h1 className='Addmessage'>selecciona una opcion</h1>
				)
			}
		</div>
	</div>
  )
}

export default Add