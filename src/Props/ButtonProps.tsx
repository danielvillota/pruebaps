export interface ButtonProps {
    msg : string;
    msgTwo ?:string;
    prev?:string
    next?:string;
    fun ?: () => void; 
    funTwo ?: () =>void;
}