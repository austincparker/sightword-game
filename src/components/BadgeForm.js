import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createBadge } from '../api/data/badgeData';
import { getLists } from '../api/data/listData';

const initialState = {
  firebaseKey: '',
  badge_name: '',
  level: '',
  imgUrl: '',
  list_id: '',
};

export default function BadgeForm({ editItem, setBadges }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectLists, setSelectLists] = useState([]);

  useEffect(() => {
    if (editItem.firebaseKey) {
      setFormInput(editItem);
      getLists().then(setSelectLists);
    } else {
      setFormInput(initialState);
      getLists().then(setSelectLists);
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem.firebaseKey) {
      console.warn(editItem);
    } else {
      console.warn(formInput);
      createBadge({ ...formInput }).then(() => setBadges);
      resetForm();
    }
  };

  return (
    <div>
      <h3>Make a New Badge</h3>
      <div>
        <form onSubmit={handleSubmit} className="ms-2">
          <div>
            <label htmlFor="bname" className="form-label">
              Badge Name
              <input
                style={{
                  width: '30rem',
                }}
                id="badge_name"
                name="badge_name"
                value={formInput.badge_name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </label>
          </div>
          <div>
            <label htmlFor="level" className="form-label">
              Badge Level
              <input
                style={{
                  width: '30rem',
                }}
                id="level"
                name="level"
                value={formInput.level}
                onChange={handleChange}
                required
                className="form-control"
              />
            </label>
          </div>
          <div>
            <label htmlFor="imgUrl">
              Badge Image Url
              <input
                style={{
                  width: '30rem',
                }}
                type="url"
                id="imgUrl"
                name="imgUrl"
                value={formInput.imgUrl}
                onChange={handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="m-2">
            <label>
              For Which List?
              <select
                // value={formInput.list_id}
                // onChange={handleChange}
                style={{
                  width: '30rem',
                }}
                className="form-select m-auto"
                aria-label="Default select example"
                required
              >
                <option defaultValue>Select List</option>
                {selectLists.map((list) => (
                  <option value={list.firebaseKey} key={list.firebaseKey}>
                    {list.name}
                  </option>
                ))}
                ;
              </select>
            </label>
          </div>
          <button className="btn btn-success" type="submit">
            {editItem.firebaseKey ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

BadgeForm.defaultProps = {
  editItem: {},
  setBadges: () => {},
};

BadgeForm.propTypes = {
  editItem: PropTypes.shape(PropTypes.obj),
  setBadges: PropTypes.func,
};
