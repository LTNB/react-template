import React, { ReactNode } from 'react';

export function Dialog(props: { id?: string, className?: string, title?: string, children: ReactNode }) {
  const { id = 'dialog', className = '', title = 'Dialog', children } = props;

  return <section className={`modal fade ${className}`} id={id} tabIndex={-1} role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header bg-light">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </section>
}