// オセロダッシュボード - React版

const { useState, useEffect, useRef } = React;

// 学生アイコンを取得
const getStudentIcon = (index) => {
    const icons = ['🎯', '⚡', '🌟', '🎨', '🚀', '💎', '🎪', '🎭', '🎸', '🎲', '🎳', '🎰', '🎱'];
    return icons[index % icons.length];
};

// ローディング画面コンポーネント
const LoadingScreen = () => (
    <div style={{ textAlign: 'center', color: 'white', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>🎮 オセロダッシュボード</h1>
        <p style={{ fontSize: '1.5em' }}>読み込み中...</p>
        <div style={{ marginTop: '30px' }}>
            <div style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                border: '5px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
        </div>
    </div>
);

// エラー画面コンポーネント
const ErrorScreen = ({ message }) => (
    <div style={{ textAlign: 'center', color: 'white', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>❌ エラー</h1>
        <p style={{ fontSize: '1.5em' }}>{message}</p>
    </div>
);

// 学生カードコンポーネント
const StudentCard = ({ student, index, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '15px',
                padding: '25px',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                color: 'white',
                textAlign: 'center',
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.3)' : '0 5px 15px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div style={{ fontSize: '4em', marginBottom: '10px' }}>
                {getStudentIcon(index)}
            </div>
            <div style={{ fontSize: '1.1em', marginBottom: '15px', opacity: 0.9 }}>
                {student.name}
            </div>
            <button
                style={{
                    background: isButtonHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
                    border: '2px solid white',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1.1em',
                    fontWeight: 'bold',
                    width: '100%',
                    transition: 'background 0.3s'
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
            >
                プレイ
            </button>
        </div>
    );
};

// 学生リストコンポーネント
const StudentList = ({ students, onSelectStudent, onBackToSelection }) => {
    const [backHovered, setBackHovered] = useState(false);

    return (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
            <button
                onClick={onBackToSelection}
                style={{
                    background: backHovered ? '#764ba2' : '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1.1em',
                    marginBottom: '20px',
                    transition: 'background 0.3s'
                }}
                onMouseEnter={() => setBackHovered(true)}
                onMouseLeave={() => setBackHovered(false)}
            >
                ← 選択画面に戻る
            </button>
            <h1 style={{
                fontSize: '2.5em',
                marginBottom: '30px',
                color: '#333',
                textAlign: 'center'
            }}>
                🎮 オセロゲーム一覧 ({students.length}作品)
            </h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '30px'
            }}>
                {students.map((student, index) => (
                    <StudentCard
                        key={index}
                        student={student}
                        index={index}
                        onClick={() => onSelectStudent(index)}
                    />
                ))}
            </div>
        </div>
    );
};

// 学生コード詳細コンポーネント
const StudentDetail = ({ student, index, onBack, output }) => {
    const [backHovered, setBackHovered] = useState(false);

    const codeLines = student.code.split('\n').length;

    return (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
            <button
                onClick={onBack}
                style={{
                    background: backHovered ? '#764ba2' : '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1.1em',
                    marginBottom: '20px',
                    transition: 'background 0.3s'
                }}
                onMouseEnter={() => setBackHovered(true)}
                onMouseLeave={() => setBackHovered(false)}
            >
                ← 一覧に戻る
            </button>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '30px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div>
                    <div style={{ fontSize: '3em', marginBottom: '5px' }}>
                        {getStudentIcon(index)}
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#999' }}>
                        作者: {student.name}
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        alert('プレイ機能は未実装です。プレイするにはコードをGoogle Colabにコピーして実行してください。');
                    }}
                    title="プレイ機能は未実装です。プレイするにはコードをGoogle Colabにコピーして実行してください。"
                    style={{
                        background: '#cccccc',
                        color: '#666666',
                        border: 'none',
                        padding: '18px 36px',
                        borderRadius: '12px',
                        cursor: 'not-allowed',
                        fontSize: '1.4em',
                        fontWeight: 'bold',
                        opacity: 0.6
                    }}
                >
                    🎮 プレイ
                </button>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <h2 style={{ fontSize: '1.2em', color: '#555', margin: 0 }}>コード</h2>
                    <span style={{ fontSize: '0.9em', color: '#999' }}>全{codeLines}行</span>
                </div>
                <pre style={{
                    background: '#f5f5f5',
                    padding: '20px',
                    borderRadius: '10px',
                    overflowX: 'auto',
                    maxHeight: '600px',
                    fontSize: '0.85em',
                    border: '2px solid #e0e0e0',
                    lineHeight: '1.5'
                }}>
                    {student.code}
                </pre>
            </div>

            {output && (
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    background: '#f9f9f9',
                    borderRadius: '10px',
                    minHeight: '100px',
                    border: '2px solid #e0e0e0'
                }}>
                    {output}
                </div>
            )}
        </div>
    );
};

// 出力コンポーネント
const OutputDisplay = ({ type, content }) => {
    const preRef = useRef(null);

    // 実行中の場合、スクロールを自動的に最下部に移動
    useEffect(() => {
        if (preRef.current && type === 'running') {
            preRef.current.scrollTop = preRef.current.scrollHeight;
        }
    }, [content, type]);

    if (type === 'running') {
        return (
            <div>
                <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '1.2em' }}>
                    📺 出力 <span style={{ color: '#667eea', fontSize: '0.9em' }}>(実行中...)</span>
                </h3>
                <pre
                    ref={preRef}
                    id="output-display-pre"
                    style={{
                        background: '#1e1e1e',
                        color: '#d4d4d4',
                        padding: '20px',
                        borderRadius: '8px',
                        overflowX: 'auto',
                        overflowY: 'auto',
                        minHeight: '200px',
                        maxHeight: '400px',
                        border: '2px solid #333',
                        whiteSpace: 'pre-wrap',
                        fontFamily: "'Consolas', 'Monaco', monospace",
                        fontSize: '0.9em'
                    }}
                >
                    {content || '(出力待機中...)'}
                </pre>
            </div>
        );
    }

    if (type === 'success') {
        return (
            <div>
                <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '1.2em' }}>📺 出力</h3>
                <pre id="output-display-pre" style={{
                    background: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    minHeight: '200px',
                    maxHeight: '400px',
                    border: '2px solid #333',
                    whiteSpace: 'pre-wrap',
                    fontFamily: "'Consolas', 'Monaco', monospace",
                    fontSize: '0.9em'
                }}>
                    {content || '(出力なし)'}
                    {'\n\n✅ 実行完了'}
                </pre>
            </div>
        );
    }

    if (type === 'error') {
        return (
            <>
                <h3 style={{ color: '#dc3545', marginBottom: '15px', fontSize: '1.3em' }}>
                    ❌ エラーが発生しました
                </h3>
                <pre id="output-display-pre" style={{
                    background: '#fff3f3',
                    padding: '20px',
                    borderRadius: '8px',
                    overflowX: 'auto',
                    color: '#dc3545',
                    border: '2px solid #ffcdd2'
                }}>
                    {content}
                </pre>
            </>
        );
    }

    return null;
};

// 選択画面コンポーネント
const SelectionScreen = ({ onSelect }) => {
    const [lectureHovered, setLectureHovered] = useState(null);

    const options = [
        { lecture: 10, course: 3, label: '第10回 プログラミング実習講義3（火2）', file: '10_3.json' },
        { lecture: 10, course: 4, label: '第10回 プログラミング実習演習4（火3）', file: '10_4.json' },
        { lecture: 11, course: 3, label: '第11回 プログラミング実習講義3（火2）', file: '11_3.json' },
        { lecture: 11, course: 4, label: '第11回 プログラミング実習演習4（火3）', file: '11_4.json' }
    ];

    return (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1 style={{
                fontSize: '2.5em',
                marginBottom: '20px',
                color: '#333',
                textAlign: 'center'
            }}>
                🎮 オセロダッシュボード
            </h1>
            <p style={{
                fontSize: '1.2em',
                color: '#666',
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                講義回とコースを選択してください
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px'
            }}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(option.file)}
                        onMouseEnter={() => setLectureHovered(index)}
                        onMouseLeave={() => setLectureHovered(null)}
                        style={{
                            background: lectureHovered === index
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '30px 20px',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            fontSize: '1.3em',
                            fontWeight: 'bold',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            transform: lectureHovered === index ? 'translateY(-5px)' : 'translateY(0)',
                            boxShadow: lectureHovered === index
                                ? '0 15px 30px rgba(0,0,0,0.3)'
                                : '0 5px 15px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div style={{ fontSize: '1.2em', marginBottom: '10px' }}>
                            📚
                        </div>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// メインアプリケーションコンポーネント
const OthelloDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
    const [outputType, setOutputType] = useState(null);
    const [outputContent, setOutputContent] = useState('');

    useEffect(() => {
        // 初期化処理
        setLoading(false);
    }, []);

    const handleFileSelect = async (filename) => {
        setLoading(true);
        try {
            const response = await fetch(`data/${filename}`);
            const data = await response.json();
            setStudents(data);
            setSelectedFile(filename);
            setLoading(false);
        } catch (err) {
            console.error('File loading error:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSelectStudent = (index) => {
        setCurrentStudentIndex(index);
        setOutputType(null);
        setOutputContent('');
    };

    const handleBack = () => {
        setCurrentStudentIndex(null);
        setOutputType(null);
        setOutputContent('');
    };

    const handleBackToSelection = () => {
        setSelectedFile(null);
        setStudents([]);
        setCurrentStudentIndex(null);
        setOutputType(null);
        setOutputContent('');
    };

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen message={error} />;
    }

    // ファイル未選択の場合は選択画面を表示
    if (!selectedFile) {
        return <SelectionScreen onSelect={handleFileSelect} />;
    }

    if (currentStudentIndex !== null) {
        const output = outputType ? (
            <OutputDisplay
                type={outputType}
                content={outputContent}
            />
        ) : null;

        return (
            <StudentDetail
                key={currentStudentIndex}
                student={students[currentStudentIndex]}
                index={currentStudentIndex}
                onBack={handleBack}
                output={output}
            />
        );
    }

    return <StudentList students={students} onSelectStudent={handleSelectStudent} onBackToSelection={handleBackToSelection} />;
};

// Reactアプリケーションをマウント
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<OthelloDashboard />);
