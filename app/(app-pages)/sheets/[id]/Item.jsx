'use client'

function Item(props) {
    return (
    <div>
        <h1>Sheet {props.website}</h1>
        <img src={props.dscreenshot} />

    </div>
    )
}

export default Item;
