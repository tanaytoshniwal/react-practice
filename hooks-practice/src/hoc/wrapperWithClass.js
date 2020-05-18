import React from 'react'

const wrapperWithClass = (ChildComponent, className) => {
    return props => (
        <div className={className}>
            <ChildComponent {...props} />
        </div>
    )
}

export default wrapperWithClass