import { ReactNode } from "react"
import "./styles.css";

interface ICard {
  title?: String,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  style?: React.CSSProperties,
  element?: ReactNode,
  notitle?: boolean,
}

function Card(props: ICard) {

  let style = {
    ...props.style,
  }

  return (
    <div className="Card"
      style={style}
      onClick={props.onClick}>
      <div className="card-content">
        {!props.notitle && <div className="card-title">{props.title}</div>}
        <div className="element">
          {props.element}
        </div>
      </div>
    </div>
  )
}

export default Card;