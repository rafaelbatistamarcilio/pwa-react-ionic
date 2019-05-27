import React from "react";

export const FileInput = props => (
    <div>
        <input type="file" accept={props.tipoArquivo} onChange={e => props.change(e.target.files)} />
    </div>
)