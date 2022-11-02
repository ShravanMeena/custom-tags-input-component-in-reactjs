import React, { useState } from "react";
import "./styles.css";

const data = [
  "html",
  "html5",
  "css",
  "css3",
  "javascript",
  "python",
  "bootstrap",
  "material-design",
  "tag-line",
];

export default function App() {
  const [tagValue, setTagValue] = useState("");
  const [editTagValue, setEditTagValue] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      if (isSimilarTag(tagValue)) {
        alert("exist");
        return;
      }

      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };

  const deletTag = (val) => {
    let reaminTags = tags.filter((t) => t !== val);
    setTags(reaminTags);
  };

  const isSimilarTag = (val) => {
    if (tags.includes(val)) {
      return true;
    }
  };

  const editTag = (e) => {
    if (e.keyCode === 13 && editTagValue) {
      if (isSimilarTag(editTagValue)) {
        alert("exist");
        return;
      }
      let index = tags.findIndex((val) => val === tagValue);
      tags[index] = editTagValue;
      setTags(tags);
      setTagValue("");
      setEditTagValue("");
    }
  };

  const openEditTagInput = (e) => {
    setEditTagValue(e);
    setTagValue(e);
  };

  const onChangeSelect = (e) => {
    let value = e.target.value;
    if (isSimilarTag(value)) {
      alert("exist");
      return;
    }

    setTags([...tags, value]);
    setSuggestedTags([]);
    setTagValue("");
  };

  const onChange = (e) => {
    let value = e.target.value;
    setTagValue(value);

    if (value.length > 2) {
      const dataByFlt = data;

      let res = dataByFlt.filter((x) =>
        x?.toLowerCase()?.includes(value?.toLowerCase())
      );

      setSuggestedTags(res);
    }
  };
  return (
    <div className="main">
      <div className="content">
        {editTagValue && (
          <input
            type="text"
            placeholder="type and enter"
            value={editTagValue}
            onChange={(e) => setEditTagValue(e.target.value)}
            onKeyDown={editTag}
          />
        )}
        <div className="tagInput">
          {tags.map((item, index) => {
            return (
              <button key={index}>
                {item}
                <span onClick={() => deletTag(item)}>X</span>
                <span
                  style={{
                    color: "green",
                    border: "1px solid gray",
                  }}
                  onClick={() => openEditTagInput(item)}
                >
                  Edit
                </span>
              </button>
            );
          })}

          <input
            type="text"
            placeholder="type and enter"
            value={tagValue}
            onChange={(e) => onChange(e)}
            onKeyDown={addTags}
          />
        </div>

        {suggestedTags.length > 0 && (
          <select onChange={onChangeSelect}>
            <option key="select" value="Select">
              Select
            </option>
            {suggestedTags.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </div>
  );
}
