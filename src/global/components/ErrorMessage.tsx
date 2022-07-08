interface Props {
    message: string;
}
export function ErrorMessage(props: Props) {
    return <div>{props.message}</div>
}