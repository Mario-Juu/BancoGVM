package com.bancogvm.service;

import com.bancogvm.repository.EmprestimoRepository;
import com.bancogvm.service.model.EmprestimoEntity;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class EmprestimoServiceImpl implements EmprestimoService {

    private final EmprestimoRepository repo;

    public EmprestimoEntity solicitar(EmprestimoEntity e) {
        e.setDataSolicitacao(Instant.now());
        e.setStatusEmprestimo("PENDENTE");
        return repo.save(e);
    }

    public EmprestimoEntity aprovar(Long id, BigDecimal valorAprovado) {
        EmprestimoEntity e = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));
        e.setValorAprovado(valorAprovado);
        e.setDataAprovacao(Instant.now());
        e.setStatusEmprestimo("APROVADO");
        e.setMotivoRejeicao(null);
        return repo.save(e);
    }

    public EmprestimoEntity rejeitar(Long id, String motivo) {
        EmprestimoEntity e = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));
        e.setStatusEmprestimo("REJEITADO");
        e.setMotivoRejeicao(motivo);
        e.setDataAprovacao(Instant.now());
        return repo.save(e);
    }

    public List<EmprestimoEntity> listarTodos() {
        return repo.findAll();
    }

    public EmprestimoEntity buscarPorId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));
    }
}