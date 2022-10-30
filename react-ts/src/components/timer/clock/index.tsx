import style from "./Clock.module.scss"

interface Props {
    duration?: number
}

export default function clock({ duration = 0 }: Props) {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    const [ mDez, mUn ] = String(minutes).padStart(2, '0');
    const [ sDez, sUn ] = String(seconds).padStart(2, '0');

    return (
        <>
            <span className={ style.clockNumber }>{mDez}</span>
            <span className={ style.clockNumber }>{mUn}</span>
            <span className={ style.clockDiv }>:</span>
            <span className={ style.clockNumber }>{sDez}</span>
            <span className={ style.clockNumber }>{sUn}</span>
        </>
    )
}