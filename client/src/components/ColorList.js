import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      console.log(response.data);
      const updatedColors = colors.map(color => {
        return (color.id === colorToEdit.id) ? colorToEdit: color;
      })
      updateColors(updatedColors);

    })
    .catch(error => console.log(error));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => {
      console.log(response);
      updateColors(colors.filter(colorElement => colorElement.id !== color.id))
    })
  };

  const addColor = event => {
    event.preventDefault();
    axiosWithAuth()
    .post('http://localhost:5000/api/colors', colorToAdd)
    .then(response => {
      console.log(response.data);
      updateColors([...colors, colorToAdd])
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <div className='add-color-form'>
        <form onSubmit={addColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={event => 
                setColorToAdd({ ...colorToAdd, color: event.target.value})
              }
              value={colorToAdd.color}
              />
          </label>
          <label>
            hex code:
            <input
              onChange={event => 
                setColorToAdd({ ...colorToAdd, code: {hex: event.target.value}})
              }
              value={colorToAdd.code.hex}
              />
          </label>
          <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
