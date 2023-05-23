import './Prawy.css';

export default function NoteTile(props) {

    function handleClick2(){
        props.setNote(props.id)
    }

    return(
        <>


       <textarea key={props.id} onClick={handleClick2}
                     defaultValue={
                        props.tekst
                    }
                    readOnly={true}
                    className="notatka"
                    />
        </>
    )
}