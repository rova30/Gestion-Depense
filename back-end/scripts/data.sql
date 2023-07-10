INSERT INTO Roles(nom) VALUES
('Grand-parent'),
('Parent'),
('Enfant');

INSERT INTO Sexes(nom) VALUES
('Homme'),
('Femme');

INSERT INTO TypeDepenses(nom) VALUES
('Loisir');


INSERT INTO TypeRevenus(nom) VALUES
('Salaire');


INSERT INTO Depenses(famille_id, membre_id, typedepense_id, montant, date_depense) VALUES
(1, 1, 1, 35000, '2023-02-12');

INSERT INTO Depenses(famille_id, membre_id, typedepense_id, montant, date_depense) VALUES
    (1, 1, 1, 80000, '2023-05-12');


INSERT INTO Revenus(famille_id, membre_id, typerevenu_id, montant, date_revenu) VALUES
(1, 1, 1, 450000, '2023-02-12');

INSERT INTO Revenus(famille_id, membre_id, typerevenu_id, montant, date_revenu) VALUES
(1, 1, 1, 350000, '2023-08-12');

INSERT INTO Revenus(famille_id, membre_id, typerevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 20000, '2023-09-12');


INSERT INTO Revenus(famille_id, membre_id, typerevenu_id, montant, date_revenu) VALUES
    (1, 1, 1, 70000, '2023-07-12');
