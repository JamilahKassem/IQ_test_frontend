'use client';

export const Template = ({ children }) => {
    return (
        <>
            <main className="main" id="top">
                <section>
                    <div className="container">
                        {children}
                    </div>
                </section>
            </main>
        </>
    );
};