import "../css/Index2.css";

function DivBox(props): JSX.Element {
    return (
        <>
            <div className="div-box"><h1>This is a DivBox react.js {props.nombre} {props.apellido}</h1></div>
        </>
    )
}

function Button(props) : JSX.Element {
    let color;
    if (props.type == "green")
    {
        console.log(props.value + " IS GREEN");
        color = "button-green";
    }
    else
    {
        console.log(props.value + " IS NOT GREEN");
        color = "button-green-line";
    }

    return (
        <button className={color}>{props.value}</button>
    )
}

function Index2(): JSX.Element {
	return (
		<>
            <div className="box">
                <div className="box1">
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, iusto ab nemo, ad minus ratione possimus nesciunt maxime, rem expedita consectetur iste ipsum. Fugiat in nihil cupiditate dolore voluptates veniam!</p>
                    <Button value="Clic" type="green"/>
                    <Button value="Clic 2"/>
                </div>
                <div className="box2">
                    <img src="/src/assets/img/img1.png" width="500px" height="500px"/>
                </div>
            </div>
            <div className="div-2">
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="box">
                    <DivBox nombre="pepe"/>
                    <DivBox nombre="alejandro" apellido="pepe"/>
                    <DivBox />
                </div>
            </div>
		</>
	);
}

export default Index2;