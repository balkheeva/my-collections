import styles from './ImageContainer.module.scss'
export default function ImageContainer(props: any) {
    return (
        <div className={styles.root}>
            {props.children}
        </div>
    )
}