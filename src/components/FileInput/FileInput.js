import React from "react";

export const FileInput = props => (
    <div>
        <input type="file" onChange={e => props.change(e.target.files)} />
    </div>
)