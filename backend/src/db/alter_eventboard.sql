-- USE portalfraternidade;

--Altera o tipo do campo existente para armazenar tambem hora, não apenas a data.
ALTER TABLE EventBoard MODIFY COLUMN EventDate DATETIME NULL;

--Adiciona novos campos para detalhar o evento (início, fim, local, status, visibilidade, etc.)
ALTER TABLE EventBoard
  ADD COLUMN StartAt DATETIME NOT NULL AFTER EventDate,
  ADD COLUMN EndAt DATETIME NOT NULL AFTER StartAt,
  ADD COLUMN Location VARCHAR(150) NULL AFTER EndAt,
  ADD COLUMN Status VARCHAR(10) NOT NULL DEFAULT 'DRAFT' AFTER Location,
  ADD COLUMN Visibility VARCHAR(10) NOT NULL DEFAULT 'PUBLIC' AFTER Status,
  ADD COLUMN Category VARCHAR(100) NULL AFTER Visibility,
  ADD COLUMN CreatedByUserAccountId INT NOT NULL AFTER Category,
  ADD COLUMN UpdatedByUserAccountId INT NULL AFTER CreatedByUserAccountId,
  ADD COLUMN CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER UpdatedByUserAccountId,
  ADD COLUMN UpdatedAt DATETIME NULL AFTER CreatedAt,
  ADD COLUMN DeletedAt DATETIME NULL AFTER UpdatedAt;

-- Cria vínculos com a tabela de usuários para identificar quem criou e quem atualizou.
ALTER TABLE EventBoard
  ADD CONSTRAINT FK_EventBoard_CreatedBy
  FOREIGN KEY (CreatedByUserAccountId) REFERENCES UserAccount(UserAccountId);

-- guarda o ID do usuário que editou o evento por último. (É opcional, porque o evento pode ainda não ter sido alterado)
ALTER TABLE EventBoard
  ADD CONSTRAINT FK_EventBoard_UpdatedBy
  FOREIGN KEY (UpdatedByUserAccountId) REFERENCES UserAccount(UserAccountId);

-- Cria índices para acelerar consultas por data de início, status e visibilidade.
CREATE INDEX IX_EventBoard_StartAt ON EventBoard (StartAt);
CREATE INDEX IX_EventBoard_Status ON EventBoard (Status);
CREATE INDEX IX_EventBoard_Visibility ON EventBoard (Visibility);
