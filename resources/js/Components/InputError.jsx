export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-meta-1 mt-1' + className}>
            {message}
        </p>
    ) : null;
}
