/** @jsx VLibCreate */

import {
  VLibCreate
} from "../lib/vlib";

export const FunctionalComponent = ({
	firstName,
	lastName,
	birthDay,
	emailAddr
}) => {

  const createInputElement = (name, value) => {
    return (
      <div>
        <label for={'txt_' + name.toLowerCase() }>{name}</label>
        <br />
        <input type="text" id={'txt_' + name.toLowerCase() } value={value} /><br /><br />
      </div>
    )
  };

  const handleClick = () => {
    alert("Oki doki")
  };

  const view = (<div>
    { createInputElement("Firstname", firstName) }
    { createInputElement("Lastname", lastName) }
    { createInputElement("Birthday", birthDay) }
    { createInputElement("Email", emailAddr) }
    <button onclick={ handleClick } >Click</button>
  </div>);

  return view;
}
