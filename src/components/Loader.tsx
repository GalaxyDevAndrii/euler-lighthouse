export default function Loader({ size = 48 }: { size: number }) {
    return (
        <svg viewBox="0 0 32 34" width={size} height={size} className="flex justify-center items-center">
            <polygon className="triangleLoader animate-dash" fill="none" points="16,1 32,32 1,32" strokeWidth="1"></polygon>
        </svg>
    );
}
