import React from "react";
import classNames from "classnames";

interface NavigationButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ onClick, disabled, className, }) => (
    <button
        className={classNames('control-buttons__default', className)}
        onClick={onClick}
        disabled={disabled}
    >
    </button>
);