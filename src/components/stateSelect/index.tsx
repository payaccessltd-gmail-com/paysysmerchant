import styles from './styles.module.css'
import states from './State';
import { stateTypes } from '../../Utils/types';
import CustomDropDown from '../reusables/dropdowns/CustomDropDown';

export type PropType = {
  stateVal: (arg0: any) => void;

  setNaijaState: (arg0: any) => void;
  setLga: (arg0: any) => void;
  setNaijaLga: (arg0: string) => void;
  lgaVal: (arg0: any) => void;
  stateClassName: any;
  naijaState: any;
  statePlaceholder: any;
  lgaClassName: any;
  naijaLga: any;
  lgaPlaceholder: any;
  towns: any[];
}


const ReactNaijaStateLgaSelect = (props: PropType) => {
  const stateList = Object.keys(states).map(key => ({
    name: key
  }));

  const handleStateSelect = (e: { target: { value: any; }; }) => {
    props.stateVal(e.target.value);
    const stateSel: string = e.target.value;
    const lgaSel = stateSel !== '' ? states[stateSel as keyof stateTypes] : '';
    props.setNaijaState(stateSel);
    props.setLga(lgaSel);
    props.setNaijaLga('');
  };

  const handleLgaSelect = (e: { target: { value: any; }; }) => {
    props.lgaVal(e.target.value);
    const lgaSel = e.target.value;
    props.setNaijaLga(lgaSel);
  };


  return (
    <div className='grid md:grid-cols-2 gap-[20px] items-center ' >
        {/* <CustomDropDown
        label="State"
        onHandleChange={(e: any) => handleStateSelect(e)}
        value={props.naijaState}
        options={stateList}
        setValue={props.setNaijaState}
        />
        <CustomDropDown
        label="LGA"
        onHandleChange={(e: any) => handleLgaSelect(e)}
        value={props.naijaLga}
        options={props.towns}
        setValue={props.lgaVal}
        /> */}
      <select
        onChange={(e: any) => handleStateSelect(e)}
        className={props.stateClassName || styles.test}
        value={props.naijaState}
      >
        <option value=""> {props.statePlaceholder || 'Select State'}</option>
        {stateList.map((state, key) => (
          <option key={key} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <select
        name="Cities"
        onChange={(e: any) => handleLgaSelect(e)}
        className={props.lgaClassName || styles.test}
        value={props.naijaLga}
      >
        <option value=""> {props.lgaPlaceholder || 'Select LGA'}</option>
        {props.towns.map((lga: any, key: any) => (
          <option key={key} value={lga}>
            {lga}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ReactNaijaStateLgaSelect;