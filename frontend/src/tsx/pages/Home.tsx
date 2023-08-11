import "../../css/pages/Home.css";

function Button(props): JSX.Element {
    let color;
    if (props.type == "green") {
        // console.log(props.value + " IS GREEN");
        color = "button-green";
    } else {
        // console.log(props.value + " IS NOT GREEN");
        color = "button-green-line";
    }

    return <button className={color}>{props.value}</button>;
}

function DivBox(props): JSX.Element {
    return (
        <>
            <div className="charts">
                <img src={props.img} alt="" />
                <h3>{props.title} </h3>
                <p>{props.content}</p>
                <a href={props.hrefcontent}>{props.subtitle}</a>
            </div>
        </>
    );
}

function Home() {
    return (
        <>
            <div className="container">
                <div className="maxw">
                    <h1>¡Bienvenidos a WEE GIG!</h1>
                    <p>En WEE GIG, nos enorgullece ser un puente entre individuos comprometidos y apasionados por hacer una diferencia en el mundo y oportunidades de trabajo en el ámbito de la beneficencia. Somos más que una empresa; somos un catalizador para el cambio positivo. Nuestra misión es clara: conectar a personas con corazones generosos con proyectos y organizaciones benéficas que necesitan su apoyo. Trabajamos incansablemente para brindar oportunidades de voluntariado, empleo y colaboración en el sector de la beneficencia, asegurándonos de que cada acción contribuya a causas valiosas y a comunidades necesitadas.</p>
                    <Button href='/SignIn' value="Crear Cuenta" type="green" />
                    <Button href='/Login' value="Iniciar Sesion" />
                </div>
                <div className="leftimg">
                    <img src="./src/assets/img/initial.jpg" alt="" />
                </div>
            </div>
            <div className="containers">
                <div>
                    <h1 className="textmarg">Descubre todo lo que ofrece WEE GIG</h1>
                    <h2>
                        <a href="">
                            Para mayor información no dude en ponerse en contacto con nosotros.                        
                        </a>
                    </h2>
                    <div className="chart">
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/2.jpg"
                                title="Descubre Oportunidades de Voluntariado"
                                content="Explora nuestras diversas oportunidades de voluntariado y únete a proyectos inspiradores que impactan positivamente en comunidades vulnerables. Desde educación y salud hasta empoderamiento y medio ambiente, hay una gama de opciones esperando tu compromiso"
                                subtitle="Explorar Oportunidades"
                                hrefcontent="www.google.com"
                            />
                        </div>
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/3.jpg"
                                title="Empleo con Propósito en el Sector de Beneficencia."
                                content="¿Buscas un trabajo que vaya más allá de las ganancias? Explora nuestras ofertas laborales en el sector de beneficencia y únete a equipos comprometidos con un propósito. Ya sea en gestión, comunicaciones, desarrollo de programas o más, aquí encontrarás oportunidades para crecer profesionalmente y marcar la diferencia."
                                subtitle="Ver Ofertas de Empleo"
                                hrefcontent="./Ofertas"
                            />
                        </div>
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/4.jpg"
                                title="Colabora en Proyectos Benéficos Innovadores"
                                content="Si tienes habilidades específicas, ¡puedes hacer una diferencia aún mayor! Únete a proyectos benéficos innovadores que buscan mentes creativas en diseño, tecnología, investigación y más. Tu experiencia puede impulsar el progreso en áreas críticas. Descubre cómo puedes colaborar para crear un mundo mejor."
                                subtitle="Explorar Colaboraciones"
                                hrefcontent="www.google.com"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
