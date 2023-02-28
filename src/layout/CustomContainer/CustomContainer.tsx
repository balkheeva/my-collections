import styles from "./CustomContainer.module.scss"

export default function CustomContainer(props: any) {
    return <div className={styles.customContainer}>{props.children}</div>
}