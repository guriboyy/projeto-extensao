CREATE DATABASE PortalFraternidade
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci;

--Tabela de Tipos Usuário
CREATE TABLE Role (
    RoleId      INT AUTO_INCREMENT PRIMARY KEY,
    Name        VARCHAR(20) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--Tabela de Usuário
CREATE TABLE UserAccount (
    UserAccountId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName     VARCHAR(150) NOT NULL,
    LastName      VARCHAR(150) NOT NULL,
    Email         VARCHAR(150) NOT NULL UNIQUE,
    Password      VARCHAR(255) NOT NULL,
    PhoneNumber   VARCHAR(30) NULL,
    IsActive      BOOLEAN DEFAULT TRUE NOT NULL,
    RoleId        INT NOT NULL,
    CreatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt     TIMESTAMP NULL,

    FOREIGN KEY (RoleId) REFERENCES Role(RoleId);
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--Tabela de Mural de Eventos
CREATE TABLE EventBoard (
    EventBoardId INT AUTO_INCREMENT PRIMARY KEY,
    Title        VARCHAR(150) NOT NULL,
    Description  TEXT,
    EventDate    DATE NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--Tabela de Mural de Avisos
CREATE TABLE NoticeBoard (
    NoticeBoardId INT AUTO_INCREMENT PRIMARY KEY,
    Description   TEXT NOT NULL,
    PostedBy      INT,
    PostedDate    DATE NOT NULL,
    EndDate       DATE NULL,

    FOREIGN KEY (PostedBy) REFERENCES UserAccount(UserAccountId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Tabela de Tipo de Reuniões
CREATE TABLE MeetingCategory (
    MeetingCategoryId INT AUTO_INCREMENT PRIMARY KEY,
    Name              VARCHAR(130) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Tabela de Reuniões
CREATE TABLE Meeting (
    MeetingId       INT AUTO_INCREMENT PRIMARY KEY,
    MeetingDate         DATE NOT NULL,
    ResponsibleUserId   INT NULL,
    MeetingCategoryId   INT NOT NULL,
    Description         TEXT NULL,

    FOREIGN KEY (ResponsibleUserId) REFERENCES UserAccount(UserAccountId),
    FOREIGN KEY (MeetingCategoryId) REFERENCES MeetingCategory(MeetingCategoryId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Tabela de RefreshTokens
CREATE TABLE RefreshToken (
    RefreshTokenId      INT AUTO_INCREMENT PRIMARY KEY,
    Token               VARCHAR(255) NOT NULL,
    UserAccountId       INT NOT NULL,
    CreatedAt           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ExpirationDate      TIMESTAMP NULL,
    IsRevoked           BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (UserAccountId) REFERENCES UserAccount(UserAccountId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--Tabela de Telas do Sistema
CREATE TABLE Screen (
    ScreenId            INT AUTO_INCREMENT PRIMARY KEY,
    Name                VARCHAR(100) NOT NULL,
    Icon                VARCHAR(100) NULL,
    Path                VARCHAR(255) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Tabela de Funcoes das Telas do Sistema
CREATE TABLE ScreenFunction (
    ScreenFunctionId        INT AUTO_INCREMENT PRIMARY KEY,
    ScreenId                INT NOT NULL,
    Name                    VARCHAR(100) NOT NULL,
    Description             VARCHAR(200) NULL,

    FOREIGN KEY (ScreenId) REFERENCES Screen(ScreenId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--Tabela de Permissões as Telas do Sistema
CREATE TABLE RoleScreen (
    RoleScreenId            INT AUTO_INCREMENT PRIMARY KEY,
    ScreenId                INT NOT NULL,
    RoleId                  INT NOT NULL,

    FOREIGN KEY (ScreenId) REFERENCES Screen(ScreenId),
    FOREIGN KEY (RoleId) REFERENCES Role(RoleId),
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--Tabela de Permissões as funções da tela do sistema
CREATE TABLE RoleScreenFunction (
    RoleScreenFunctionId            INT AUTO_INCREMENT PRIMARY KEY,
    ScreenFunctionId                INT NOT NULL,
    RoleId                          INT NOT NULL,

    FOREIGN KEY (ScreenFunctionId) REFERENCES ScreenFunction(ScreenFunctionId),
    FOREIGN KEY (RoleId) REFERENCES Role(RoleId),
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;