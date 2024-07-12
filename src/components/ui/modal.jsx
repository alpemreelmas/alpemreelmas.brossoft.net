"use client"
import * as React from 'react'
import { cn } from '@/lib/utils'

const Modal = React.forwardRef(({ open, onClose, className, children, ...props}, ref) => {


    return (
        <div onClick={onClose} className={cn(className,"", open ? "visible": "invisible")} {...props}>
            {children}
        </div>

    )
})

Modal.displayName = "Modal";

export default Modal
