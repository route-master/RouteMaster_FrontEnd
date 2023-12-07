import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const Content = <div>test</div>;

  function MockModal() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
      <div>
        <button type="button" onClick={() => setModalOpen(true)}>
          Open Modal Btn
        </button>
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            Content={Content}
            mywidth="100px"
            myheight="100px"
          />
        )}
      </div>
    );
  }

  it('renders Modal with content', () => {
    render(<MockModal />);
    fireEvent.click(screen.getByText('Open Modal Btn'));
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('closes Modal on close button click', () => {
    render(<MockModal />);
    fireEvent.click(screen.getByText('Open Modal Btn'));
    fireEvent.click(screen.getByText('x'));
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });

  it('closes when clicking on the background', () => {
    render(<MockModal />);
    fireEvent.click(screen.getByText('Open Modal Btn'));
    const background = screen.getByTestId('modal-background'); // Add this data-testid to your background div
    fireEvent.click(background);
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
});
