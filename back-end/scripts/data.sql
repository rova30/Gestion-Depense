INSERT INTO Roles(nom) VALUES
('Grand-parent'),
('Parent'),
('Enfant');

INSERT INTO Sexes(nom) VALUES
('Homme'),
('Femme');

INSERT INTO TypeDepenses(nom) VALUES
('Logement'),
('Nourriture'),
('Transport '),
('Santé'),
('Éducation'),
('Loisirs et divertissements'),
('Vêtements et articles ménagers'),
('Communication'),
('Assurances'),
('Économies et investissements');


INSERT INTO TypeRevenus(nom) VALUES
('Salaire ou revenu professionnel'),
('Revenus de placement'),
('Revenus de retraite'),
('Allocations et prestations'),
('Revenus supplémentaires'),
('Autres sources de revenus');


-- Insertion des familles
INSERT INTO Familles (nom,responsable) VALUES
('Smith','johnsmith@example.com'),
('Johnson','robertjohnson@example.com');

-- Insertion des membres pour chaque famille
-- Famille Smith
INSERT INTO Membres (famille_id, role_id, nom, prenom, date_naissance, sexe_id, login, mdp) VALUES
                                                                                                (1, 1, 'Smith', 'John', '1980-01-15', 1, 'johnsmith@example.com', 'motdepasse1'),
                                                                                                (1, 2, 'Smith', 'Lisa', '1982-06-22', 2, 'lisasmith@example.com', 'motdepasse2'),
                                                                                                (1, 2, 'Smith', 'Emma', '2005-09-03', 2, 'emmasmith@example.com', 'motdepasse3'),
                                                                                                (1, 3, 'Smith', 'James', '2010-03-12', 1, 'jamessmith@example.com', 'motdepasse4'),
                                                                                                (1, 3, 'Smith', 'Olivia', '2013-11-28', 2, 'oliviasmith@example.com', 'motdepasse5');

-- Famille Johnson
INSERT INTO Membres (famille_id, role_id, nom, prenom, date_naissance, sexe_id, login, mdp) VALUES
                                                                                                (2, 1, 'Johnson', 'Robert', '1975-08-10', 1, 'robertjohnson@example.com', 'motdepasse6'),
                                                                                                (2, 2, 'Johnson', 'Emily', '1981-04-18', 2, 'emilyjohnson@example.com', 'motdepasse7'),
                                                                                                (2, 2, 'Johnson', 'Sophia', '2008-12-27', 2, 'sophiajohnson@example.com', 'motdepasse8'),
                                                                                                (2, 3, 'Johnson', 'Daniel', '2011-07-05', 1, 'danieljohnson@example.com', 'motdepasse9'),
                                                                                                (2, 3, 'Johnson', 'Liam', '2014-05-09', 1, 'liamjohnson@example.com', 'motdepasse10');




-- Revenus et dépenses pour chaque famille sur l'année 2023 (en Ariary)

-- Famille Smith
-- Janvier 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 5000000, '2023-01-15');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (1, 2, 2, 700000, '2023-01-05'),
                                                                                        (1, 3, 3, 300000, '2023-01-10'),
                                                                                        (1, 4, 5, 200000, '2023-01-18'),
                                                                                        (1, 5, 6, 150000, '2023-01-22');

-- Février 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 5000000, '2023-02-15');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (1, 2, 2, 650000, '2023-02-06'),
                                                                                        (1, 3, 3, 280000, '2023-02-12'),
                                                                                        (1, 4, 5, 180000, '2023-02-19'),
                                                                                        (1, 5, 6, 120000, '2023-02-24');

-- Mars 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 5500000, '2023-03-15');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (1, 2, 2, 600000, '2023-03-07'),
                                                                                        (1, 3, 3, 250000, '2023-03-14'),
                                                                                        (1, 4, 5, 160000, '2023-03-21'),
                                                                                        (1, 5, 6, 110000, '2023-03-26');

-- Avril 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 7500000, '2023-04-15');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (1, 2, 2, 60000, '2023-04-07'),
                                                                                        (1, 3, 3, 25000, '2023-04-14'),
                                                                                        (1, 4, 5, 760000, '2023-04-21'),
                                                                                        (1, 5, 6, 110000, '2023-04-26');

-- Mai 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 300000, '2023-05-15');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (1, 2, 2, 60000, '2023-05-07'),
                                                                                        (1, 3, 3, 25000, '2023-05-14'),
                                                                                        (1, 4, 5, 7600, '2023-05-21'),
                                                                                        (1, 5, 6, 2100, '2023-05-26');

-- Juin 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 150000, '2023-06-15');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (1, 2, 2, 60000, '2023-06-07'),
                                                                                        (1, 3, 3, 25000, '2023-06-13'),
                                                                                        (1, 5, 6, 2100, '2023-06-14');


-- Juillet 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 750000, '2023-07-11');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (1, 2, 2, 86000, '2023-07-07'),
                                                                                        (1, 3, 3, 20000, '2023-07-12'),
                                                                                        (1, 5, 6, 9900, '2023-07-13');











-- Famille Johnson
-- Janvier 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (2, 1, 1, 4500000, '2023-01-10');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (2, 2, 2, 600000, '2023-01-03'),
                                                                                        (2, 3, 3, 350000, '2023-01-15'),
                                                                                        (2, 4, 5, 180000, '2023-01-20'),
                                                                                        (2, 5, 6, 120000, '2023-01-25');

-- Février 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (2, 1, 1, 4800000, '2023-02-12');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (2, 2, 2, 550000, '2023-02-05'),
                                                                                        (2, 3, 3, 320000, '2023-02-18'),
                                                                                        (2, 4, 5, 190000, '2023-02-23'),
                                                                                        (2, 5, 6, 130000, '2023-02-28');

-- Mars 2023
INSERT INTO Revenus (famille_id, membre_id, typeRevenu_id, montant, date_revenu) VALUES
    (2, 1, 1, 5200000, '2023-03-15');
INSERT INTO Depenses (famille_id, membre_id, typeDepense_id, montant, date_depense) VALUES
                                                                                        (2, 2, 2, 580000, '2023-03-07'),
                                                                                        (2, 3, 3, 310000, '2023-03-20'),
                                                                                        (2, 4, 5, 200000, '2023-03-25'),
                                                                                        (2, 5, 6, 150000, '2023-03-30');
SELECT * FROM v_transactions WHERE famille_id = 1 AND membre_id = 1 ORDER BY date_transaction DESC
