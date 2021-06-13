const Paginator = ({ page, hasNext, handlePageChange }) => {
    let newPage = page;
    return (
        <div className="paginator-wrapper">
            <div className="paginator-left"></div>
            <div className="page-buttons">
                <button disabled={page <= 0} onClick={(_) => handlePageChange(newPage - 1)} className="tab-left">&#60;</button>
                <span className="currentPage">{newPage + 1}</span>
                <button disabled={!hasNext} onClick={(_) => handlePageChange(newPage + 1)} className="tab-right">&#62;</button>
            </div>

        </div>
    )
}

export default Paginator;