import './Card.css'
import user from "./assets/user.png";

const Card = ({id,title, status, user, priority,tag,img}) =>{

return(
    <div>
        <div className='id'>
            <div>
            {id}
            </div>
            <div>
        <img  src= {img} style={{height:"1.6rem"}}/>
        </div>
        </div>
       
        <div className='title'>
       <span> {title}</span>
      
        </div>
        <div>
            {tag[0]}
        </div>
    </div>
)

}

export default Card