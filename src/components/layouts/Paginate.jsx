import React from 'react';
import { Pagination } from 'react-bootstrap';

function Paginate({ currentPage, totalPages, onPageChange }) {
    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <Pagination className="justify-content-end">
            <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handleClick(i + 1)}
                >
                    {i + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
    );
}

export default Paginate;
